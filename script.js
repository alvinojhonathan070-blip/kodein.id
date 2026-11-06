const hero = document.getElementById("hero");
const navDesk = document.getElementById("navDesk")

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
           
            navDesk.classList.add("bg-[#000c3d]/40") 
            navDesk.classList.remove("bg-[#000c3d]/95")
        }
        else{
            navDesk.classList.remove("bg-[#000c3d]/40") 
            navDesk.classList.add("bg-[#000c3d]/95")
        }
    })
},{threshold: 0.1})

observer.observe(hero)