import React from 'react';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';


class IssueFilter extends React.Component{
    constructor({ location : { search }}){
        super();
        const params = new URLSearchParams(search);
        this.state = {
            status : params.get('status') || "",
            effortMin: params.get('effortMin') || '',
            effortMax: params.get('effortMax') ||'',
            changed : false,
        };
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.showOriginalFilter = this.showOriginalFilter.bind(this);
        this.onChangeEffortMin = this.onChangeEffortMin.bind(this);
        this.onChangeEffortMax = this.onChangeEffortMax.bind(this);
    }

    componentDidUpdate(prevProps){
        const { location : { search : prevSearch } } = prevProps ;
        const { location : { search }} = this.props ;
        if( prevSearch !== search ){
            this.showOriginalFilter();
        }
    }

    onChangeEffortMin(e){
        const effortString = e.target.value;
        if(effortString.match(/^\d*$/)){
            this.setState({ effortMin : e.target.value, changed : true });
        }
    }
    
    onChangeEffortMax(e){
        const effortString = e.target.value;
        if(effortString.match(/^\d*$/)){
            this.setState({ effortMax : e.target.value, changed : true });
        }
    }

    onChangeStatus(e){
        this.setState( { status : e.target.value , changed : true });
    }

    showOriginalFilter(){
        const { location : { search }} = this.props;
        const params = new URLSearchParams(search);
        this.setState({ 
            status : params.get('status') || "" ,
            effortMin: params.get('effortMin') || '',
            effortMax: params.get('effortMax') ||'',
            changed : false,
            })
    }

    applyFilter(){
        const { status, effortMin, effortMax } = this.state;
        const { history } = this.props;

        const params = new URLSearchParams();
        if (status) params.set('status', status);
        if (effortMin) params.set('effortMin', effortMin);
        if (effortMax) params.set('effortMax', effortMax);

        const search = params.toString() ? `?${params.toString()}` : '';
        history.push( { pathname : '/issues' , search });
    }
    

    render(){
        const { status, changed } = this.state ;
        const { effortMin , effortMax } = this.state;
        return (
            <div style={{padding:"10px"}}>
              {/* Status: {' '} */}
                <InputLabel id="status">Status</InputLabel>
                <Select sx={{width: "100px"}}labelId="status"placeholder='Status' size="small"value={status} label="status" onChange={this.onChangeStatus}>
                <MenuItem value="" >All</MenuItem>
                <MenuItem value="New" >New</MenuItem>
                <MenuItem value="Assigned" >Assigned</MenuItem>
                <MenuItem value="Fixed" >Fixed</MenuItem>
                <MenuItem value="Closed" >Closed</MenuItem>
              </Select>
              {/* <select value={status} onChange={this.onChangeStatus}>
                <option value="">(All)</option>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
                <option value="Fixed">Fixed</option>
                <option value="Closed">Closed</option>
              </select> */}
              {' '}
              {/* Effort between: */}
              {' '}

              <TextField labelId="mineffort" label="effortmin"size="small" value={effortMin} onChange={this.onChangeEffortMin}/>
              {/* <input type="text" size={5} value={effortMin} onChange={this.onChangeEffortMin} /> */}
              {'-'}
              <TextField label="effortmax" size="small" value={effortMax} onChange={this.onChangeEffortMax}/>

              {/* <input type="text" size={5} value={effortMax} onChange={this.onChangeEffortMax} /> */}
              {' '}
              <Tooltip  title="apply" arrow>
                <Button 
                    variant='contained' 
                    size="large" 
                    type="button" 
                    onClick={this.applyFilter}>
                        Apply
                </Button>
              </Tooltip>
              
              {' '}
              <Tooltip title="Reset" arrow>
                <Button 
                variant='contained' 
                size="large" 
                onClick={this.showOriginalFilter} 
                disabled={!changed}>Reset</Button>
              </Tooltip>
            </div>
        );
    }
}

export default withRouter(IssueFilter);