import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='h-screen'>
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div class="mx-auto max-w-screen-sm text-center">
                        <h1 class="mb-4 text-7xl tracking-tight font-bold lg:text-7xl text-[#FF6216]">404</h1>
                        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>

                        <Button
                            onClick={() => navigate('/')}
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                bgcolor: "#FF6216", // Use the primary color from Tailwind config
                                "&:hover": {
                                    bgcolor: "#E55A12", // Change to secondary color from Tailwind config on hover
                                },
                            }}
                        > Back to Homepage</Button>
                        {/* <a href="#" class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a> */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NotFound