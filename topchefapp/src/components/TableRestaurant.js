import React, { Component } from 'react';
import json from '../restaurant-vidu'
import StarRatingComponent from 'react-star-rating-component';
import { isUndefined } from 'util';


class TableRestaurant extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            restaurants: json
        }
    }

    render(){
        return(
            <table className="table table-hover">
                <thead>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Stars</th>
                    <th>Deals</th>
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
                                        />              
                                    </td>
                                    
                                    <td>{restau.sales[0].title}</td>
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