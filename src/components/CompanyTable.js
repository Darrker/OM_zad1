import React from "react";

class CompanyTable extends React.Component{

    render(){
        return(
            <div className="table-responsive company-table">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nazwa</th>
                            <th scope="col">Kod firmy</th>
                            <th scope="col">Profil firmy</th>
                            <th scope="col">Adres</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((item, index)=>{
                            return(
                                <tr key={index}>
                                   
                                    <td>{item.name}</td>
                                    <td>{item.code}</td>
                                    <td>{item.companyProfile}</td>
                                    <td>{item.city} <br />
                                    {item.zipcode}  {item.street} 
                                    </td>
                                    <td>{item.email}</td>
                                  
                                    <td><button onClick={e => {e.preventDefault(); this.props.deleteCompany(item.activeCompany, item.code)}} className="btn btn-dark">X</button></td>
                                </tr>
                            );
                        })}
                        
                       
                </tbody>
            </table>
          </div>
        );
    }
}

export default CompanyTable;