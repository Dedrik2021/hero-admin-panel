import { useState } from "react";
import { v4 as uuiv4 } from "uuid";
import {useDispatch, useSelector} from 'react-redux'

import {useHttp} from '../../hooks/http.hook'
import { heroCreated } from "../heroesList/heroesSlice";
import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";

const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState('')
    const [heroDescr, setHeroDesr] = useState('')
    const [heroElement, setHeroElement] = useState('')
    const {filtersLoadingStatus} = useSelector(state => state.filters)
    const dispatch = useDispatch()
    const {request} = useHttp()
    const filters = selectAll(store.getState())

    const onSubmit = (e) => {
        e.preventDefault()
        const newHero = {
            id: uuiv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(res => console.log(res, 'Sending is success'))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => alert(err))

        setHeroName('')
        setHeroDesr('')
        setHeroElement('')
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Loading elements</option>
        } else if (status === 'error') {
            return <option>loading error</option>
        }

        return filters.map(({name, label}) => {
            if (name === 'all') return
            return (
                <option key={name} value={name} id={name}>
                    {label}
                </option>
            )
        })
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit} >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">The name of the new hero</label>
                <input 
                    required
                    type="text" 
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What's my name?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    value={heroDescr}
                    onChange={(e) => setHeroDesr(e.target.value)}
                    className="form-control" 
                    id="text" 
                    placeholder="What I can do?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Select a Hero element</label>
                <select 
                    required
                    className="form-select" 
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                    id="element" 
                    name="element">
                    <option >I own the element...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}


export default HeroesAddForm;