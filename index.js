const CARS = [
    {
        name: "giulia-105",
        url: "https://www.classiccars4sale.net/images/uploads/aa/alfa_thumb.jpg",
        alt: "Red Alfa Romeo Giulia 105",
        type: "sedans"
    },

    {
        name: "159",
        url: "https://www.alfaowner.com/cdn-cgi/image/format=auto,onerror=redirect,width=1920,height=1920,fit=scale-down/https://www.alfaowner.com/attachments/20210403_145343-jpg.955692/",
        alt: "Red Alfa Romeo 159",
        type: "sedans"
    },

    {
        name: "giulia-952",
        url: "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/alfa-romeo-giulia-qv-front-three-quarter-2.jpg?itok=h_iSCsZe",
        alt: "Red Alfa Romeo Giulia 952",
        type: "sedans"
    },

    {
        name: "duetto",
        url: "https://collectingcars.imgix.net/013319/Alpha-DuettoS-21-.jpg?fit=clip&w=2000&auto=format,compress&cs=srgb&q=85",
        alt: "Red Alfa Romeo Duetto Spider",
        type: 'convertibles'
    },

    {
        name: "916",
        url: "https://parkers-images.bauersecure.com/wp-images/3451/cut-out/1200x800/alfa_spider.jpg?mode=max&quality=90&scale=down",
        alt: "Red Alfa Romeo 916 Spider",
        type: 'convertibles'
    },

    {
        name: "939",
        url: "https://collectingcars.imgix.net/images/2020/10/BEN5338.jpg?fit=clip&w=2000&auto=format,compress&cs=srgb&q=85",
        alt: "Red Alfa Romeo 939 Spider",
        type: 'convertibles'
    },

    {
        name: "tipo-33",
        url: "https://amazingclassiccars.com/wp-content/uploads/2021/08/wallpapers_alfa_romeo_tipo_33_1967_1-e1628751221520.jpg",
        alt: "Red Alfa Romeo Tipo 33 Stradale",
        type: 'sport-cars'
    },

    {
        name: "8-c",
        url: "https://cdn.motor1.com/images/mgl/WxYZg/s2/alfa-romeo-8c-competizione.webp",
        alt: "Red Alfa Romeo 8C Competizione",
        type: 'sport-cars'
    },

    {
        name: "4-c",
        url: "https://parkers-images.bauersecure.com/wp-images/21638/cut-out/1200x800/alfa_4c_coupe.jpg?mode=max&quality=90&scale=down",
        alt: "Red Alfa Romeo 4C",
        type: 'sport-cars'
    }
]

    ; (() => {
        const scriptElement = document.querySelector("script")

        const updateBigImageElementSrc = (url) => bigImageElement.src = url
        const updateModalElementVisibility = (shouldModalBeOpen) => modalElement.style.visibility = shouldModalBeOpen ? "visible" : "hidden"
        const handleButtonOnClick = (event) => {
            updateModalElementVisibility(true)

            const clickedCar = CARS.find(car => car.url === event.target.currentSrc)
            updateBigImageElementSrc(clickedCar.url)
        }
        const handleCloseModal = () => updateModalElementVisibility(false)

        const modalElement = document.createElement("div")
        modalElement.id = "modal"

        updateModalElementVisibility(false)

        document.body.insertBefore(modalElement, scriptElement)

        const handlePreviousButtonOnClick = () => {
            if (!bigImageElement.src) {
                return
            }

            const currentCarIndex = CARS.findIndex(car => car.url === bigImageElement.src)

            let previousCarIndex = currentCarIndex - 1
            if (previousCarIndex < 0) {
                previousCarIndex = CARS.length - 1
            }

            const previousCarUrl = CARS[previousCarIndex].url
            updateBigImageElementSrc(previousCarUrl)
        }

        const handleNextButtonOnClick = () => {
            if (!bigImageElement.src) {
                return
            }

            const currentCarIndex = CARS.findIndex(car => car.url === bigImageElement.src)

            let nextCarIndex = currentCarIndex + 1
            if (nextCarIndex > CARS.length - 1) {
                nextCarIndex = 0
            }

            const nextCarUrl = CARS[nextCarIndex].url
            updateBigImageElementSrc(nextCarUrl)
        }

        const buttonCloseElement = document.createElement("button")
        buttonCloseElement.innerText = 'Close'
        buttonCloseElement.className = "modal-controls"
        buttonCloseElement.id = "close-element"
        buttonCloseElement.onclick = handleCloseModal
        modalElement.appendChild(buttonCloseElement)

        // MODAL CONTENT ELEMENT
        const modalContentElement = document.createElement('div')
        modalContentElement.id = 'modal-content'
        modalElement.appendChild(modalContentElement)

        const buttonPreviousElement = document.createElement("button")
        buttonPreviousElement.innerText = "Previous"
        buttonPreviousElement.className = "modal-controls"
        buttonPreviousElement.id = "previous-element"
        buttonPreviousElement.onclick = handlePreviousButtonOnClick
        modalContentElement.appendChild(buttonPreviousElement)

        const bigImageElement = document.createElement("img")
        bigImageElement.id = 'big-modal-image'
        modalContentElement.appendChild(bigImageElement)

        const buttonNextElement = document.createElement("button")
        buttonNextElement.innerText = 'Next'
        buttonNextElement.className = "modal-controls"
        buttonNextElement.id = "next-element"
        buttonNextElement.onclick = handleNextButtonOnClick
        modalContentElement.appendChild(buttonNextElement)
        //

        const mainElement = document.createElement("main")
        document.body.insertBefore(mainElement, scriptElement)

        const gridElement = document.createElement("div")
        gridElement.id = "grid"
        mainElement.appendChild(gridElement)

        const carsGroupedByType = [...new Set(CARS.map(elem => elem.type))].map(elem => ({
            type: elem,
            cars: CARS.filter(elem1 => elem1.type === elem)
        }))

        carsGroupedByType.forEach(elem => {
            const rowElement = document.createElement("div")
            rowElement.className = "row"
            rowElement.id = elem.type
            gridElement.appendChild(rowElement)

            elem.cars.forEach(car => {
                const buttonElement = document.createElement("button")
                buttonElement.className = "car-button"
                buttonElement.onclick = handleButtonOnClick
                rowElement.appendChild(buttonElement)

                const imageElement = document.createElement("img")
                imageElement.className = "car-image"
                imageElement.id = car.name
                imageElement.src = car.url
                imageElement.alt = car.alt
                buttonElement.appendChild(imageElement)
            })

        })

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'Escape':
                    handleCloseModal()
                    break

                case 'ArrowLeft':
                    handlePreviousButtonOnClick()
                    break

                case 'ArrowRight':
                    handleNextButtonOnClick()
                    break
            }
        })
    })()