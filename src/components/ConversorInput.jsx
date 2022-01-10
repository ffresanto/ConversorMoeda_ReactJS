import React from 'react'
import PropTypes from 'prop-types'
import './ConversorInput.css';

export default function ConversorInput(props) {
    return (
        <div className='group'>
            <input type="text" value={props.quantidade} onChange={e => props.onQuantidadeChange(e.target.value)} />
            <select value={props.moeda} onChange={e => props.onMoedaChange(e.target.value)}>
                {props.moedas.map((moeda => (
                    <option value={moeda}>{ moeda }</option>
                )))}
            </select>
        </div>
    )
}

ConversorInput.propTypes = {
    quantidade: PropTypes.number.isRequired,
    moeda: PropTypes.string.isRequired,
    moedas: PropTypes.array,
    onQuantidadeChange: PropTypes.func,
    onMoedaChange: PropTypes.func,
};