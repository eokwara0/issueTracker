import React from 'react';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import { ButtonGroup,Button,FormHelperText, FormControl,FormControlLabel,FormGroup, InputLabel, MenuItem, Select, TextField, Tooltip, FormLabel } from '@mui/material';


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
            <FormGroup>
            <FormControl size='string'>
                    <InputLabel id="status">Status</InputLabel>
                    <Select labelId="status"placeholder='Status' value={status} label="status" onChange={this.onChangeStatus}>
                    <MenuItem value="" >All</MenuItem>
                    <MenuItem value="New" >New</MenuItem>
                    <MenuItem value="Assigned" >Assigned</MenuItem>
                    <MenuItem value="Fixed" >Fixed</MenuItem>
                    <MenuItem value="Closed" >Closed</MenuItem>
                </Select>
                <FormHelperText id="status" component="h1">Issue Status</FormHelperText>
            </FormControl>
                {'-'}
                {'-'}
            
            <FormControl size="string">
                <FormLabel filled={true}>Effort Between</FormLabel>
                <TextField labelId="mineffort" label="effortmin" value={effortMin} onChange={this.onChangeEffortMin}/>
                <FormHelperText id="mineffort" component="h1">EffortMin</FormHelperText>
                {'-'}
                {'-'}
                <TextField labelId="maxeffort" label="effortmax" value={effortMax} onChange={this.onChangeEffortMax}/>
                <FormHelperText id="maxeffort" component="h1">EffortMax</FormHelperText>
            </FormControl>
                {'-'}
                {'-'}
            <FormControl>
                <ButtonGroup fullWidth={true} sx={{ height: 40}} variant='outlined' size='large' aria-label="large button group">
                    <Tooltip  title="apply" arrow>
                        <Button 
                            color='secondary'
                            size="string" 
                            type="button" 
                            onClick={this.applyFilter}>
                                Apply
                        </Button>
                    </Tooltip>
                    <Tooltip title="Reset" arrow>
                        <Button 
                        color='secondary'
                        size="string" 
                        onClick={this.showOriginalFilter} 
                        disabled={!changed}>Reset</Button>
                    </Tooltip>
                </ButtonGroup>
            </FormControl>
        </FormGroup>

        );
    }
}

export default withRouter(IssueFilter);