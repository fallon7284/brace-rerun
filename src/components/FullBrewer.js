import React from 'react'
import history from '../history'
import { Link } from 'react-router-dom'

export default class FullBrewer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            brewer: {}
        }
    }

    async componentDidMount(){
        if (this.props.match){
            try {
                const brewery = await fetch(`https://api.openbrewerydb.org/breweries/${this.props.match.params.id}`)
                const brewer = await brewery.json()
                this.setState({brewer})
            } catch(error){
                console.log(error)
            } 
        }
        else{
            this.setState({brewer: this.props.brewer})
            history.push(`/${this.props.brewer.id}`)
        }
    }


    render(){
        let clickBack = <Link style={{textDecoration: 'none', color: 'black'}}to="/">{this.state.brewer.name}</Link>
        if (this.props.unselectBrewer){
            clickBack = (
            <div onClick={() => {
                history.push('/')
                this.props.unselectBrewer()  
            }}>{this.state.brewer.name}</div>
            )
        } 

        return (
            this.state.brewer ?
            <div>{clickBack}</div> :
            <div>Woops!  No brewer here.</div>
        )
    }
}