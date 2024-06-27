class player():
    def __init__(self):
        self.stats = {
            'Art':0,
            'Math':0,
            'Music':0,
            'Econ':0,
            'Lit':0,
            'Science':0,
            'Socialscience':0
        }
    def change(self,subject,amount):
        if amount<51 and amount>-1:
            self.stats[subject]=(self.stats[subject]+amount)/2

kenneth = player()
while True:
    try:
        subject = input ("What subject?")
        score = int(float(input ("What score?")))
        kenneth.change(subject,score)
    except EOFError:
        break
for i,j in kenneth.stats.items():
    print(f"{i}:{j}" )
