import React from 'react';
import CardPremio from './CardPremio';
import { Box } from "@material-ui/system";

export default function Cards_Premios({premios, classes}) {
    return (
        <div>
            {premios.map((premio, index) => {
                return (
                    <div>
                        <Box className={classes.formInputFlex} >
                            <CardPremio index={index} />
                        </Box>
                    </div>
                )
            })}
        </div>
        
    )
}
