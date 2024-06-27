from django.shortcuts import render,redirect
from .models import Student
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as authlogin
from django import forms
from .models import input
from .models import aevent
from django.core.serializers import serialize
from django.http import JsonResponse
import random
import json
class setForm(forms.ModelForm):
    SUBjects = [('ss','Ss'),('music','Music'),('lit','Lit'),('math','Math'),('science','Science'),('art','Art'),('econ','Econ')]
    name= forms.ModelChoiceField(queryset=Student.objects.all())
    def __init__(self, *args, **kwargs):
        super(setForm, self).__init__(*args, **kwargs)
        self.fields['name'].label_from_instance = lambda obj: "%s" % obj.name
    subject = forms.ChoiceField(choices=SUBjects)
    score = forms.IntegerField(min_value=0, max_value=50)
    event = forms.ModelChoiceField(queryset=aevent.objects.all())
    class Meta:
        model = Student  
        fields = ['name', 'subject', 'score', 'event']

def profile(request, name):
    loweredname = name.capitalize()
    lmao = Student.objects.get(name=loweredname)
    if lmao.overall>8000:
        status = 'Godlike'
    elif lmao.overall>6000 and  lmao.overall<8000:
        status = 'Acceptable'
    elif lmao.overall>5000 and lmao.overall<6000:
        status = 'E-Rank'
    else:
        status ='what.'
    return render(request,"profiles.html",{
        "student":lmao,
        "status":status,
        'allstudents':sorted(Student.objects.all(), key= lambda x:x.name)
    })

def index(request):
    list = sorted(Student.objects.all(),key=lambda x:x.overall, reverse=True)
    team= 0
    for gpagroup in ["Honors","Scholastic","Varsity"]:
        teams = sorted(Student.objects.filter(gpa = gpagroup), key = lambda x:x.overall, reverse=True)[0:2]
        for student in teams:
            team = team + student.overall
    idx = random.randint(0,Student.objects.count()-1)
    name = Student.objects.all()[idx].name

    return render(request,"index.html",{
        "overall":list,
        "teamscore":team,
        "name":name
    })
def login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            authlogin(request, user)
            return redirect("setting")

        else:
            return render(request,"login.html")
    else:
        return render(request,"login.html")

def subjects(request,subject):
    titles = {"ss":"Social Science", "math":"Mathematics","science":"Science","art":"Art","econ":"Economics","music":"Music","lit":"Literature"}
    students = sorted(Student.objects.all(),key=lambda x:getattr(x,subject), reverse=True)
    for student in students:
        student.dynamic_subject = getattr(student, subject)
    return render(request,"layout.html",{
        "overall":students,
        "subject":subject,
        "title":titles[subject]
    })

def get_subject(request,subject):
    titles = {"ss":"Social Science", "math":"Mathematics","science":"Science","art":"Art","econ":"Economics","music":"Music","lit":"Literature"}
    students = sorted(Student.objects.all(),key=lambda x:getattr(x,subject), reverse=True)
    for student in students:
        student.dynamic_subject = getattr(student, subject)
    students_json = json.loads(serialize('json', students))
    return JsonResponse({"overall": students_json, "title": titles[subject]})

def events(request):
    lmao = []
    for event in aevent.objects.all():
        lmao.append({event:event.input_set.all()})
    return render(request,'events.html',{
        "list": reversed(lmao),
    })


            
@login_required
def setting(request):
    if request.method == "POST":
        form = setForm(request.POST)
        if form.is_valid():
            student = form.cleaned_data["name"]
            subject = form.cleaned_data["subject"]
            score = form.cleaned_data["score"]
            theevent = form.cleaned_data["event"]
            smile= Student.objects.get(name=student)
            if subject == 'math':
                setattr(smile, subject, (getattr(smile,subject)+int(score)*28.57*3)/4)
            else:
                setattr(smile, subject, (getattr(smile,subject)+int(score)*60)/4)
            smile.save()
            instance, created = aevent.objects.get_or_create(name = theevent)
            nani, create = input.objects.get_or_create(name = smile.name, event = instance)
            setattr(nani,subject,int(score))
            nani.save()
            instance.save()


            return render(request, "setting.html",{
                "students": Student.objects.all(),
                "form" : form
            })
                
    else:
        return render(request, "setting.html",{
            "students": Student.objects.all(),
            "form" : setForm()

        })