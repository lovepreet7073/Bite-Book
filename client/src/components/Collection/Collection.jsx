import { Paper, Button } from '@mui/material';
import React, { useState } from 'react';
import image from '../../assets/images/box.jpg';
import CollectionDialog from './CollectionDialog';
import { useDispatch, useSelector } from 'react-redux';
import Collectionlist from './Collectionlist';
import { getAllCollections } from '../../redux/Collection/Actions';
import { useEffect } from 'react';
const Collection = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { collection } = useSelector((store) => store);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCollections());
    }, [dispatch]);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    // Close dialog handler
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <Paper elevation={3} className="p-5 lg:mb-[8%]">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        {collection?.allCollection?.length === 0
                            ? ""
                            : `${collection?.allCollection?.length} ${collection?.allCollection?.length === 1 ? "Collection" : "Collections"}`}
                    </h1>

                    <Button
                        variant="outlined"
                        onClick={handleOpenDialog}
                        sx={{
                            border: '2px solid #E55A12',
                            padding: '5px',
                            fontSize: '13px',
                            color: '#E55A12',
                            '&:hover': {
                                bgcolor: '#E55A12',
                                color: 'white',
                            },
                        }}
                    >
                        New Collection +
                    </Button>
                </div>
                {collection.allCollection.length > 0 ? (
                    <Collectionlist />
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <img
                            src={image}
                            alt="collection-image"
                            className="h-[16rem] w-[16rem]"
                        />
                        <h5 className="text-gray-800 text-center">
                            Organize your saved recipes into collections to help
                            <br /> you find the perfect meal for every occasion.
                        </h5>
                        <Button
                            variant="contained"
                            onClick={handleOpenDialog}
                            sx={{
                                bgcolor: '#FF6216',
                                padding: '8px',
                                fontSize: '14px',
                                '&:hover': {
                                    bgcolor: '#E55A12',
                                },
                            }}
                        >
                            Create Your First Collection
                        </Button>
                    </div>
                )}

            </Paper>


            {/* Collection Dialog */}
            <CollectionDialog open={dialogOpen} onClose={handleCloseDialog} />
        </div>
    );
};

export default Collection;
