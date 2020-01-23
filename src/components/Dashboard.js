import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CardHolder from "./CardHolder";
import LeadForm from "./LeadForm";
import Typography from "@material-ui/core/Typography";
import LeadSpec from "./LeadSpec";
export default class Index extends Component {
  state = {
    HHBleads: [],
    HBleads: [],
    IntLeads: [],
    clicked: false,
    clickedLead: null
  };
  API = "http://localhost:3000/leads";

  componentDidMount() {
    fetch(this.API)
      .then(r => r.json())
      .then(data => this.leadsFilter(data));
  }
  
  handleCardClick = (lead) => {
    this.setState({
      clicked: !this.state.clicked,
      clickedLead: lead
    }, () => console.log(this.state))
  }

  leadsFilter = data => {
    let HHBleads = data.filter(lead => lead.status === "Haven't Heard Back");
    let HBleads = data.filter(lead => lead.status === "Heard Back");
    let IntLeads = data.filter(lead => lead.status === "Interviewed");
    this.setState(
      {
        HHBleads: HHBleads,
        HBleads: HBleads,
        IntLeads: IntLeads
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      (this.state.clicked === false) ? (
      <div>
        <LeadForm></LeadForm>
        <Typography variant="heading2" component="h2">
          Your Job Leads
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Container>
              Haven't Heard Back
              <CardHolder
                handleCardClick = {this.handleCardClick}
                leads={this.state.HHBleads} />
            </Container>
          </Grid>

          <Grid item xs={4}>
            <Container>
              Heard Back
              <CardHolder
                handleCardClick = {this.handleCardClick}
                leads={this.state.HBleads} />
            </Container>
          </Grid>

          <Grid item xs={4}>
            <Container>
              Interviewed
              <CardHolder
                handleCardClick = {this.handleCardClick}
                leads={this.state.IntLeads} />
            </Container>
          </Grid>
        </Grid>
    </div> ) 
              :
    
    (
      <div>
        <LeadSpec lead={this.state.clickedLead}/>
      </div>
    )
    );
  }
}
