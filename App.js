export default class App
{
    constructor()
    {
        this.getElement = (selector) => document.querySelector(selector)

        this._phone = ""
        this._message = ""

        this._apiWhatsApp = "https://api.whatsapp.com/send?phone=55"
        this._link = ""
        this._totalDigitsRequired = 11

        this.submit = {
            enable: () => {
                window.form.submit.disabled = false
            },

            disable: () => {
                window.form.submit.disabled = true
            }
        }

        this.userMessage = {
            success: (props) => {

                let msgTag = this.getElement(".user-message")

                msgTag.innerText = props.text

                if(!msgTag.classList.contains("success"))
                {
                    msgTag.classList.add("success")
                }

                if(msgTag.classList.contains("error"))
                {
                    msgTag.classList.remove("error")
                }

                if(msgTag.classList.contains("display-none"))
                {
                    msgTag.classList.remove("display-none")
                }

            },
            error: (props) => {
                let msgTag = this.getElement(".user-message")

                msgTag.innerText = props.text

                if(!msgTag.classList.contains("error"))
                {
                    msgTag.classList.add("error")
                }

                if(msgTag.classList.contains("success"))
                {
                    msgTag.classList.remove("success")
                }

                if(msgTag.classList.contains("display-none"))
                {
                    msgTag.classList.remove("display-none")
                }
            }
        }

        this.start()
    }

    start()
    {
        window.form.onsubmit = (event) => {
            event.preventDefault()

            this.phone = window.form.phone.value
            this.message = window.form.message.value

            this.validations()
        }

        window.form.phone.onkeyup = ({target}) => {
            
            if( target.value.length === this._totalDigitsRequired )
            {
                this.submit.enable()
                return
            }

            this.submit.disable()
        }

        window.form.new.onclick = () => {
            this.restart()
        }

        window.form.copy.onclick = () => {
            window.form.link.select()
            document.execCommand ('Copy')
        }
    }

    set phone(args)
    {
        this._phone = args
    }

    get phone()
    {
        return this._phone
    }

    set message(args)
    {
        this._message = args
    }

    get message()
    {
        return this._message
    }

    set link(link)
    {
        this._link = link
    }

    get link()
    {
        return this._link
    }

    get totalDigitsRequired()
    {
        return this._totalDigitsRequired
    }

    get apiWhatsAppUrl()
    {
        return this._apiWhatsApp
    }

    validations()
    {
        if(!this.phone)
        {
            this.userMessage.error(
                {
                    text: "Informe um número de celular",
                    tagClass: "error"
                }
            )
            return false
        }

        if(this.phone.length < this.totalDigitsRequired)
        {
            let confirm = window.confirm(`Tem certeza que esse número ${this.phone} ta correto?`)

            if(confirm)
            {
                this.generateLink()
                return true
            }
            else
            {
                window.form.phone.focus()
                return false
            }
        }

        this.generateLink()
    }

    generateLink()
    {
        this.link = this.apiWhatsAppUrl + this.phone

        if(this.message)
        {
            this.link = this.link + `&text=${this.message}`
        }

        this.userMessage.success(
            {
                text: "Seu link está pronto",
                tagClass: "success"
            }
        )

        this.finish()
    }

    finish()
    {
        let initComponent = this.getElement(".initial")
        let finishComponent = this.getElement(".finished")

        if( !initComponent.classList.contains("display-none") )
        {
            initComponent.classList.add("display-none")
        }

        if( finishComponent.classList.contains("display-none") )
        {
            finishComponent.classList.remove("display-none")
        }

        window.form.link.value = this.link
    }

    restart()
    {
        let initComponent = this.getElement(".initial")
        let finishComponent = this.getElement(".finished")

        if( initComponent.classList.contains("display-none") )
        {
            initComponent.classList.remove("display-none")
        }

        if( !finishComponent.classList.contains("display-none") )
        {
            finishComponent.classList.add("display-none")
        }

        if( !this.getElement(".user-message").classList.contains("display-none") )
        {
            this.getElement(".user-message").classList.add("display-none")
        }


        window.form.phone.value = ""
        window.form.message.value = ""
        window.form.link.value = ""
    }
}