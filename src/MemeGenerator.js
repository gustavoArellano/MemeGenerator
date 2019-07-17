import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.setState({
            loading: true
        })

        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data 
                this.setState({
                    loading: false,
                    allMemeImgs: memes
                })
            })
    }   

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    // const updatedRandomImage = allMemeImgs.map(meme => {
    //     if (shuffle.url != randomImg) {
    //         const shuffle = (Math.random(meme))
    //         return {
    //             randomImg: shuffle
    //         }
    //     }
    // } 

    handleSubmit(event) {
        event.preventDefault()
        
        const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length)

        const randomMemeImg = this.state.allMemeImgs[randomNum].url

        this.setState({
            randomImg: randomMemeImg
        })
    }


    render() {
        const random = this.state.allMemeImgs.map
        console.log(random)
        return (
            <div className="memeGeneratorComponenetDiv">
                <form className="memeForm" onSubmit={this.handleSubmit}>

                    <input 
                        placeholder="Top Text"
                        type="text"
                        name="topText"
                        onChange={this.handleChange}
                        value={this.state.topText}
                    />

                    <input 
                        placeholder="Bottom Text"
                        type="text"
                        name="bottomText"
                        onChange={this.handleChange}
                        value={this.state.bottomText}
                    />

                    <button type="submit" >Generate</button>
                </form>

                <div className="meme">
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                    <img src={this.state.randomImg} alt="" />
                </div>

                <div className="test"></div>
            </div>
        )
    }
    
}

export default MemeGenerator