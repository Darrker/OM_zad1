
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyTable from './components/CompanyTable';
import AddCompanyForm from "./components/AddCompanyForm";
import './app.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visibleTable: 'active',
      companyData: localStorage.getItem("companyData") !== null ? JSON.parse(localStorage.getItem('companyData')) : 
      { active: [], inActive: []}
    };
  }


  setVisibleTable(tableType){
    this.setState({visibleTable: tableType});
  }

  updateStore(){
    localStorage.setItem('companyData', JSON.stringify(this.state.companyData));
  }
  addCompanyToStore(data){
    var tempData = this.state.companyData;
      switch(data.activeCompany){
   
        case 'tak':{
          tempData.active.push(data);
          this.setState({companyData:  tempData}, ()=> this.updateStore());
          break;
        }
        case 'nie':{
          tempData.inActive.push(data);
          this.setState({companyData:  tempData}, ()=> this.updateStore());
          break;
        }
        default:{
          break;
        }
      }
  }

  removeCompanyToStore(type, code){
    var tempData = this.state.companyData;
    switch(type){
      case 'tak':{
        let index =  tempData.active.findIndex(item => item.code === code);
        if(index !== -1){
          tempData.active.splice(index,1);
        }
        this.setState({companyData:  tempData}, ()=> this.updateStore());
        break;
      }
      case 'nie':{
        let index =  tempData.inActive.findIndex(item => item.code === code);
        if(index !== -1){
          tempData.inActive.splice(index,1);
        }
        this.setState({companyData:  tempData}, ()=> this.updateStore());
        break;
      }
      default:{
        break;
      }
    }

  }
  render(){
    
    return (
      <div className="App">
         <div className="container">
           <h1>Tabele firm</h1>
          <div className="row">
            <div className="col-12">
              <div className="table-toggler">
                <button type="button" className={`btn btn-lg ${this.state.visibleTable === 'active' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={ e => {e.preventDefault(); this.setVisibleTable('active')}}>Aktywne</button>
                <button type="button"  className={`btn btn-lg ${this.state.visibleTable === 'inActive' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={ e => {e.preventDefault(); this.setVisibleTable('inActive')}}>Nieaktywne</button>
              </div>

              {this.state.visibleTable === 'active' && this.state.companyData.active.length ?  <CompanyTable  deleteCompany={(type, code) => this.removeCompanyToStore(type, code)} data={this.state.companyData.active} /> : ""}
              {this.state.visibleTable === 'inActive' && this.state.companyData.inActive.length ?  <CompanyTable  deleteCompany={(type, code) => this.removeCompanyToStore(type, code)} data={this.state.companyData.inActive} /> : ""}
              {!this.state.companyData.active.length && !this.state.companyData.inActive.length ? <h5>Nie dodano jeszcze żadnych firm</h5>: ''}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-8">
            <AddCompanyForm 
              addCompany={data => this.addCompanyToStore(data)}
             
              />
            </div>
          </div>
        </div>

       
      </div>
    );
  }
}

export default App;
