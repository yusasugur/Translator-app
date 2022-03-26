import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';

const ListRecords = ({ savedInput }) => {
    return (
        <div className='listContainer'>
            {savedInput.length > 0 ? (
                <List
                    sx={{
                        width: 700,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        minHeight: 100,
                        borderRadius: 5,
                        '& ul': { padding: 0 },
                    }}
                >
                    {savedInput.map((item) => (
                        <ListItemButton key={item.textTur} dense>
                            <ListItem>
                                <ListItemText
                                    primary={'Turkish: ' + item.textTur}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component='span'
                                                variant='body2'
                                                color='text.primary'
                                            >
                                                {'English: ' + item.textEng}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </ListItemButton>
                    ))}
                </List>
            ) : (
                <Typography variant='h3'>No Records Found</Typography>
            )}
        </div>
    );
};

export default ListRecords;
