from django.db import models

# Create your models here.
class Student(models.Model):

    name = models.CharField(max_length=64, default = 'name')

    full_name = models.CharField(max_length=64, default = 'Full_name')

    gpa = models.CharField(default="Honors", choices=(("Honors","Honors"), ("Scholastic","Scholastic"),("Varsity","Varsity")), max_length= 64)

    ss = models.IntegerField(default=500)
    
    lit = models.IntegerField(default=500)

    econ = models.IntegerField(default=500)

    math = models.IntegerField(default=500)

    science = models.IntegerField(default=500)

    music = models.IntegerField(default=500)

    art = models.IntegerField(default=500)
    @property
    def overall(self):
        return self.art+self.music+self.ss+self.science+self.math+self.econ+self.lit+600+900+900
    def get_subject_attribute(self, subject):
        return getattr(self, subject)
    
    def __str__(self):
        return self.name
class aevent(models.Model):
    name = models.CharField(max_length=64)
    def __str__(self):
        return self.name
class input(models.Model):
    event = models.ForeignKey(aevent, on_delete=models.CASCADE)
    name = models.CharField(max_length=64, default = 'name')

    ss = models.IntegerField(default=None, blank = True, null=True)
    
    lit = models.IntegerField(default=None, blank = True,null=True)

    econ = models.IntegerField(default=None, blank = True,null=True)

    math = models.IntegerField(default=None, blank = True,null=True)

    science = models.IntegerField(default=None, blank = True,null=True)

    music = models.IntegerField(default=None, blank = True,null=True)

    art = models.IntegerField(default=None, blank = True,null=True)
    def __str__(self) -> str:
        return f"{self.name}:{self.event}"
    
class impromptu_questions(models.Model):
    question1 = models.CharField()
    question2 = models.CharField()
    question3 = models.CharField()

    def __str__(self) -> str:
        return "Hi, this is an unknown function, and your computer will crash in about 2 years."


    