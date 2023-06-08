from django.shortcuts import render, redirect
from django.http import HttpResponse
import pyttsx3
user_list = []
# Homepage
def homepage(request):
    try:
        if request.session['loggeduser']:
            if request.method == "POST":
                engine = pyttsx3.init()
                Text = request.POST.get("text")
                voices = engine.getProperty('voices') 
                engine.setProperty('voice', voices[1].id) 
                engine.save_to_file(Text, './static/test.mp3')
                engine.runAndWait()
                engine.stop()
                return render(request, 'index.html', {'download': True,'oldtext': Text})
            return render(request, 'index.html', {'download': False})
        return redirect("/login")
    except:
        return redirect('/login')

# Login page
def loginpage(request):
    print(request.session['userdata'])
    if 'loggeduser' is request.session: return redirect('/')
    if request.method == "POST":
        try:
            if 'userdata' not in request.session:
                request.session['userdata'] = user_list
                request.session['loggeduser'] = None
            email = request.POST.get("email")
            password = request.POST.get("password")
            for user in request.session['userdata']:
                if user["email"] == email and user["password"] == password:
                    print("User is successfully login")
                    request.session['loggeduser'] = user['username']
                    return redirect('/')
                else:
                    print("Please provide the valid details!")
        except:
            return redirect("/login")
    return render(request, 'login.html')

# Signup Page
def signup(request):
    if request.session['loggeduser']:
        return redirect('/')
    if request.method == "POST":
        try:
            if 'userdata' not in request.session:
                request.session['userdata'] = user_list
                request.session['loggeduser'] = None

            username = request.POST.get("username")
            email = request.POST.get("email")
            password = request.POST.get("password")
            userdata = {
                "username": username,
                "email": email,
                "password": password
            }

            for user in request.session['userdata']:
                if user["email"] == email:
                    print("User already exists")
                    return redirect('/signup')

            request.session['userdata'].append(userdata)
            print("User successfully created")
            print(request.session['userdata'])
            return redirect('/login')

        except Exception as e:
            return redirect("/signup")

    return render(request, 'signup.html')

# Logout page
def logout(request):
    try:
        if request.session['loggeduser']:
            request.session['loggeduser'] = None
            return redirect('/login')
        return redirect('/')
    except:
        return redirect("/")