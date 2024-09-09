from django.contrib import admin
from rankings.models import Student, aevent, input,impromptu_questions
# Register your models here.

admin.site.register(Student)
admin.site.register(aevent)
admin.site.register(input)
admin.site.register(impromptu_questions)