import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import FullBrewer from './FullBrewer'


export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            brewers: [],
            selectedBrewer: null,
            filterString: '',
            page: 1,
            perPage: 10,
        }
        this.setSelectedBrewer = this.setSelectedBrewer.bind(this)
        this.unselectBrewer = this.unselectBrewer.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    componentDidMount(){
        this.fetchBrewers(this.state.page, this.state.perPage)
        this.setState({selectedBrewer: null})
    }

    async fetchBrewers(page, perPage){
        const brewerData = await fetch(`https://api.openbrewerydb.org/breweries?page=${page}&per_page=${perPage}`)
        const data = await brewerData.json()
        const brewers = data.map(beer => {
            const vals = ['brewery_type', 'city', 'name', 'state']
                    let searchableString = ''
                    for (let i = 0; i < vals.length; i++){
                        if (beer[vals[i]]){
                            searchableString += `${beer[vals[i]]} `
                        }
                    }
                    return {...beer, searchableString}
                })
                console.log(brewers)
        this.setState({brewers})
    }

    unselectBrewer(){
        this.setState({selectedBrewer: null})
    }

    setSelectedBrewer(e){
        // e.preventDefault()
        const id = e.target.id
        console.log(id)
        const [selectedBrewer] = this.state.brewers.filter(brewer => {
            return brewer.id === Number(e.target.id)
        })
        this.setState({selectedBrewer})
    }

    handleFilterChange(e){
        this.setState({filterString: e.target.value.toLowerCase()})
    }

    render(){
        const pageToRender = 
        this.state.selectedBrewer !== null ? 
        <FullBrewer unselectBrewer={this.unselectBrewer} brewer={this.state.selectedBrewer}/> :
        <div>
            {this.state.brewers.filter(b => {
                return b.searchableString.toLowerCase().includes(this.state.filterString)
            }).map(b => {
                return <div onClick={this.setSelectedBrewer} key={b.id} id={b.id}>{b.name}</div>
            })}
        </div>

        const buttons = <div>
        {this.state.page > 1 && 
        <button className="button" onClick={() => {
            this.setState({page: this.state.page - 1})
            this.fetchBrewers(this.state.page - 1, this.state.perPage)
        }}>
        PREVIOUS</button>}

        {this.state.perPage < 50 && 
        <button className="button" onClick={() => {
            this.setState({perPage: this.state.perPage + 10})
            this.fetchBrewers(this.state.page, this.state.perPage + 10)
        }}>
        MORE BREWERS
        </button>}

        <input className="input" onChange={this.handleFilterChange} placeholder="Prefer your beer filtered?"></input>

        {this.state.perPage > 10 && 
        <button className="button" onClick={() => {
            this.setState({perPage: 10})
            this.fetchBrewers(this.state.page, 10)
        }}>
        FEWER BREWERS
        </button>}
        <button className="button" onClick={() => {
            this.setState({page: this.state.page + 1})
            this.fetchBrewers(this.state.page + 1, this.state.perPage)
            }}>NEXT</button>                                       
        </div>

        return (
            <div className="background">
                <div className="header">
                    <h1>BREWERY FINDER</h1>
                    <div className="header-buttons">
                    {buttons}
                    </div>
                </div>
                {pageToRender}
            </div>
        )   
    }
}