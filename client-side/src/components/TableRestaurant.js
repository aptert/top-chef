import React, { Component } from 'react';
import json from '../restaurant-vidu'
import StarRatingComponent from 'react-star-rating-component';
import lafourchettelogo from"./lafourchette.png"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './TableRestaurants.css';


class TableRestaurant extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            restaurants: json
        }
    }
   

    render(){
        return(
            <table className="table">
                <thead>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Stars</th>
                    <th>Deals</th>
                    <th></th>
                </thead> 
                <tbody>
                    {
                        this.state.restaurants.map(restau => {
                            if(restau.sales.length != 0){
                                return (
                                <tr>
                                    <td>{restau.mName}</td>
                                    <td>{restau.address.address_road + " " + restau.address.postal_code + " " + restau.address.address_locality}</td>
                                    <td><StarRatingComponent 
                                            starCount={3}
                                            value={restau.stars}
                                            editing={false}
                                        />              
                                    </td>
                                    
                                    <td>{restau.sales[0].title}</td>
                                    <td><a href={restau.laFUrl} target="blank"><img src={lafourchettelogo} className="logo_lafourchette" alt="logo_lafourchette"/></a></td>
                                </tr>                        
                                )
                            }
                            
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default TableRestaurant