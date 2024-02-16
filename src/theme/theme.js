import { createTheme } from "@mui/material";


export const theme = createTheme({
  gradient:{
    primary: "linear-gradient(180deg, #a9c9ff 0%, #ffbbec 100%)"
  },
  background:{
    color:{
        blue:'#a9c9ff',
        grey:'rgba(255, 255, 255, 0.3)'
    }
  },
  border:{
    grey:{
        light:'1px solid rgba(255, 255, 255, 0.18)'
    }
  },
  boxShadow:{
    black:{
        light:'0 8px 32px 0 rgba(0, 0, 0, 0.18)',
        dark:"rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    }
  }
});