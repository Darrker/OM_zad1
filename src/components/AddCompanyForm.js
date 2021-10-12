

import React from "react";
import {FOURdigitGenerator} from '../helpers/FOURdigitGenerator';
import FormValidator from "../helpers/FormValidator";
class AddCompanyForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            companyCode: '',
            errors: [],
            addedCompanyAlert: false,
        }
    }
    generateCompanyCode(){
        this.setState({companyCode: FOURdigitGenerator()});
    }
    displayAddedCompanyAlert(){
        this.setState({addedCompanyAlert: true}, () =>{
            setTimeout(()=>{
                this.setState({addedCompanyAlert: false});
            },5000);
        });
    }
    validateForm(formData){
        var errors = [];
        
        if(!FormValidator.testCompanyName(formData.name.value)){
            
            errors.push('Nazwa firmy powinna zawierać tylko litery oraz 20 znaków')
        } 
        if(!FormValidator.testCompanyCode(formData.code.value) ){
            errors.push('Kod firmy to 4 cyfry') 
        } 
       
        if(formData.email.value.length){
            if(FormValidator.testEmail()  ){
                errors.push('Taki email nie istnieje')
            } 
        }
        if(!formData.companyProfile.value.length){
            errors.push('Wybierz rozmiar firmy');
        }
        if(!formData.activeCompany.value.length){
            errors.push('Wybierz czy firma jest aktywna czy nie');
        }
        this.setState({errors: errors});

        return !errors.length;
        
    }
    formSubmit(e){
        e.preventDefault();
        
        if(this.validateForm(e.target)){
            this.props.addCompany({
                name: e.target.name.value,
                code: e.target.code.value,
                companyProfile: e.target.companyProfile.value,
                activeCompany: e.target.activeCompany.value,
                city: e.target.city.value,
                zipcode: e.target.zipcode.value,
                street: e.target.street.value,
                email: e.target.email.value,
            });
            e.target.reset();
            this.displayAddedCompanyAlert();
        }
    }

    displayErrors(){
        return this.state.errors.map((error,index) =>{
            return (<li key={index}>{error}</li>);
        })
    }
    render(){
       
        return(
          <React.Fragment>
              <h3 className="company-form__title">Dodaj firmę</h3>
                <form onSubmit={e => this.formSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="name">Nazwa firmy</label>
                    <input type="text" className="form-control" id="name" placeholder="Wprowadź nazwę"/>
                </div>
                <div className="form-group">
                    <label htmlFor="code">Kod firmy</label>
                    <div className="row">
                    <div className="col-10">
                        <input type="code" value={this.state.companyCode} onChange={e => this.setState({companyCode: e.target.value})} className="form-control" id="code" placeholder="Wprowadź kod"/>
                    </div>
                    <div className="col-2">  <button onClick={e => {e.preventDefault(); this.generateCompanyCode();}} className="btn btn-secondary">Generuj</button></div>
                    </div>
                
                </div>
                <div className="form-group">
                <label htmlFor="companyProfile">Profil firmy</label>
                <select className="form-control" id="companyProfile" name="companyProfile">
                    <option value="" disabled selected>Wybierz</option>
                    <option value="Mały">Mały</option>
                    <option value="Duży">Duży</option>
                    <option value="Średni">Średni</option>
                </select>
                </div>
                <h3>Aktywna firma?</h3>
                
                    <input type="radio" className="btn-check" name="activeCompany" id="activeCompany1" value="tak" />
                    <label className="btn btn-outline-secondary" htmlFor="activeCompany1">Tak</label>

                    <input type="radio" className="btn-check" name="activeCompany" id="activeCompany2"  value="nie"/>
                    <label className="btn btn-outline-secondary" htmlFor="activeCompany2">Nie</label>
              
               
                <div className="form-group">
                    <label htmlFor="city">Miasto</label>
                    <input type="text" className="form-control" id="city" name="city" placeholder="Wprowadź miasto"/>
                </div>
                <div className="form-group">
                    <label htmlFor="zipcode">Kod pocztowy</label>
                    <input type="text" className="form-control" name="zipcode" id="zipcode" placeholder="Wprowadź kod pocztowy"/>
                </div>
                <div className="form-group">
                    <label htmlFor="street">Ulica</label>
                    <input type="text" className="form-control" id="street" name="street" placeholder="Wprowadź ulicę"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Wprowadź email"/>
                </div>


                <button type="submit" className="btn btn-primary">Dodaj</button>
                </form>

                {this.state.errors.length ?
                <div className="alert alert-warning " role="alert">
                    <h4 className="alert-heading">Formularz zawiera błędy</h4>
                    <ul>
                        {this.displayErrors()}
                    </ul>
                </div>
                : ''}

                {this.state.addedCompanyAlert ?
                    <div className="alert alert-success " role="alert">
                        <h4 className="alert-heading">Dodano nową firmę</h4>
                    </div>
                : ''}
          </React.Fragment>
        );
    }
}

export default AddCompanyForm;