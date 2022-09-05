//WOOF WOOF!
document.addEventListener('DOMContentLoaded', () => {

    pupsURL = 'http://localhost:3000/pups'

    fetch(pupsURL)
    .then(response => response.json())
    .then(allPups => renderPups(allPups))

    const pupList = document.querySelector('#dog-bar')

    function renderPups(allPups) {
        allPups.map(pup => {
            const pupBar = document.createElement('mark')
            pupBar.className = 'pup-bar'
            pupBar.innerHTML = `${pup.name}`

            pupList.appendChild(pupBar)
        })

        const focusedPup = document.querySelector('#dog-info')
        const pupNav = document.querySelectorAll('.pup-bar')

        pupNav.forEach(pupItem => pupItem.addEventListener('click', (e) => {
            focusedPup.innerHTML = ''
            const focusedName = e.target.textContent
            const foundPup = allPups.filter(targetPup => targetPup.name === focusedName)

            const card = document.createElement('article')
            card.innerHTML = `
                <img src="${foundPup[0].image}"/>
                <h2>${foundPup[0].name}</h2>
                <button class='toggle'></button>
            `

            focusedPup.appendChild(card)

            const toggleBtn = document.querySelector('.toggle')

            if(foundPup[0].isGoodDog === true) {
                toggleBtn.textContent = 'Good Dog!'
            } else {
                toggleBtn.textContent = 'Bad Dog!'
            }  

            toggleBtn.addEventListener('click', () => {
                if(toggleBtn.textContent==='Good Dog!') {
                    toggleBtn.textContent = 'Bad Dog!'
                } else {
                    toggleBtn.textContent = 'Good Dog!'
                }
                foundPup[0].isGoodDog = !foundPup[0].isGoodDog

                fetch(`http://localhost:3000/pups/${foundPup[0].id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({isGoodDog: foundPup[0].isGoodDog})
                })
                .then(response => response.json())

                
            })

        }))

        let filter = false
        const filterBtn = document.querySelector('#good-dog-filter')
        const goodBoys = allPups.filter(filteredPup => filteredPup.isGoodDog===true)
        filterBtn.addEventListener('click', () => {
            filter = !filter
            if(filter) {
                console.log('true')
                filterBtn.textContent = 'Filter good dogs: ON'                
                pupList.innerHTML = ''                
                goodBoys.map(pup => {
                    const pupBar = document.createElement('mark')
                    pupBar.className = 'pup-bar'
                    pupBar.innerHTML = `${pup.name}`
                
                    pupList.appendChild(pupBar)
                })
            } else if(filter===false){
                filterBtn.textContent = 'Filter good dogs: OFF'
                pupList.innerHTML = ''
                renderPups(allPups)
            }            
        }) 
    }
});
