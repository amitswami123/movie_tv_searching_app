import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history=useHistory();
  useEffect(() => {
      if(value===0)
        history.push('/');
      else if(value===1)
        history.push('/movies');
      else if(value===2)
        history.push('/series');
      else if(value===3)  
        history.push('/search');
      
  }, [value,history])
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction 
      style={{color:'white'}}
      label="Recents" icon={<WhatshotIcon />} />
     <BottomNavigationAction 
      style={{color:'white'}}
      label="Movies" icon={<MovieFilterIcon />} />
      <BottomNavigationAction 
      style={{color:'white'}}
      label="Tv Series" icon={<TvIcon />} />
      <BottomNavigationAction 
      style={{color:'white'}}
      label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}