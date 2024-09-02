

function count2(){
    document.querySelectorAll(".overname").forEach(function(element){
        let count = parseInt(element.dataset.counter)
        let score = parseInt(element.dataset.overall)
        if (count!= score && count+200<=score){
            count+=53
            element.innerHTML=`${element.dataset.name}: ${count}`
            element.dataset.counter = count
        }
        else if (count!= score && count+200>score){
            count+=1
            element.innerHTML=`${element.dataset.name}: ${count}`
            element.dataset.counter = count
        }
    })
}
setInterval(count2,0)
function showStuff(subject){
    fetch(`/get_subjects/${subject}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('heading3').textContent = data.title;
        let overallList = document.getElementById('overall');
        overallList.innerHTML = '';  // Clear the list
        let overallData = data.overall;
        console.log(overallData)
        for (let student of overallData) {
            let listItem = document.createElement('li');
            listItem.className = 'overname';
            listItem.dataset.name = student.fields.name;
            listItem.dataset.counter = '0';
            listItem.dataset.overall = student.fields[subject];
            overallList.appendChild(listItem);                }})}

document.querySelectorAll('.sublink').forEach(subject =>{
subject.onclick = function() {
    showStuff(this.dataset.subject)}
})
setInterval(count2,0)
document.addEventListener('DOMContentLoaded', function() {
    const observertop = new IntersectionObserver(entries=>{
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.classList.add('fadeInTop')
                entry.target.style.visibility='visible'
            }
            if(!entry.isIntersecting){
                entry.target.classList.remove('fadeInTop')
                entry.target.style.visibility='hidden'
            }
        })
    }
    )
    document.querySelectorAll('.top').forEach(top =>{
        observertop.observe(top)
    })
    const observerbottom = new IntersectionObserver(entries=>{
        entries.forEach(entry =>{
            if(entry.isIntersecting){
            entry.target.classList.add('fadeInBottom')
            entry.target.style.visibility='visible'
            }
            if(!entry.isIntersecting){
                entry.target.classList.remove('fadeInBottom')
                entry.target.style.visibility='hidden'
            }
        })
    }
    )
    document.querySelectorAll('.bottom').forEach(bottom =>{
        observerbottom.observe(bottom)
    })
    const observerleft = new IntersectionObserver(entries=>{
        entries.forEach(entry =>{
            if(entry.isIntersecting){
            entry.target.classList.add('fadeInLeft')
            entry.target.style.visibility='visible'
            }
            if(!entry.isIntersecting){
                entry.target.classList.remove('fadeInLeft')
                entry.target.style.visibility='hidden'
            }
        })
    }
    )
    document.querySelectorAll('.left').forEach(left =>{
        observerleft.observe(left)
    })
})
    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry =>{
            if(entry.isIntersecting){
            entry.target.classList.add('fadeIn')
            entry.target.style.visibility='visible'
            }
            if(!entry.isIntersecting){
                entry.target.classList.remove('fadeIn')
                entry.target.style.visibility='hidden'
            }
        })
    }
    )
    document.querySelectorAll('.in').forEach(fadein =>{
        observer.observe(fadein)
    })
    const observerright = new IntersectionObserver(entries=>{
        entries.forEach(entry =>{
            if(entry.isIntersecting){
            entry.target.classList.add('fadeInRight')
            entry.target.style.visibility='visible'
            }
            if(!entry.isIntersecting){
                entry.target.classList.remove('fadeInRight')
                entry.target.style.visibility='hidden'
            }
        })
    }
    )
    document.querySelectorAll('.right').forEach(right =>{
        observerright.observe(right)
    })
