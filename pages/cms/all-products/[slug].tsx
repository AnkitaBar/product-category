import { productDetailsQuery } from '@/customHooks/cms.query.hooks';
import { Box, Card, CardContent, Chip, CircularProgress, Rating, Stack, Typography, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const SingleProduct = () => {
    const router = useRouter();
    const { slug } = router.query;

    const { data: productDetailsData, isPending: productPending } = productDetailsQuery(slug as string);

    console.log(productDetailsData, "productDetails");

    if (productPending) {
        return (
            <Box className="loader-box" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!productDetailsData) {
        return <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '20px' }}>Product not found</Typography>;
    }

    return (
        <Box sx={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <Card sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 3 }}>
                {/* Image Slider */}
                <Box sx={{ position: 'relative', height: '400px' }}>
                    {productPending ? (
                        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: '16px' }} />
                    ) : (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            spaceBetween={10}
                            slidesPerView={1}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {productDetailsData.images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <Box
                                        component="img"
                                        src={image}
                                        alt={`Product image ${index + 1}`}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            borderRadius: '16px',
                                            backgroundColor: '#f9f9f9'
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </Box>

                {/* Product Details */}
                <CardContent>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {productPending ? <Skeleton width="60%" /> : productDetailsData.title}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: '16px' }}>
                        {productPending ? (
                            <Skeleton variant="rectangular" width={100} height={20} />
                        ) : (
                            <>
                                <Rating value={productDetailsData.rating} precision={0.1} readOnly />
                                <Typography variant="body2">({productDetailsData.rating.toFixed(1)} rating)</Typography>
                            </>
                        )}
                    </Stack>

                    <Typography variant="body1" gutterBottom color="text.secondary">
                        {productPending ? <Skeleton width="80%" /> : productDetailsData.description}
                    </Typography>

                    <Typography variant="h6" sx={{ marginBottom: '8px', fontWeight: 'bold', color: 'primary.main' }}>
                        {productPending ? <Skeleton width="40%" /> : `Price: $${productDetailsData.price.toFixed(2)}`}
                    </Typography>

                    <Box sx={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
                        {productPending ? (
                            <Skeleton width={100} height={30} sx={{ marginRight: '8px', marginBottom: '8px' }} />
                        ) : (
                            productDetailsData.tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    sx={{ marginRight: '8px', marginBottom: '8px', backgroundColor: 'primary.light', color: 'white' }}
                                />
                            ))
                        )}
                    </Box>

                    <Typography variant="h6" sx={{ marginTop: '16px', marginBottom: '8px', fontWeight: 'bold' }}>
                        Reviews:
                    </Typography>
                    {productPending ? (
                        <Skeleton width="100%" height={80} />
                    ) : productDetailsData.reviews.length > 0 ? (
                        productDetailsData.reviews.map((review, index) => (
                            <Box key={index} sx={{ marginBottom: '16px', padding: '8px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                    {review.reviewerName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '4px' }}>
                                    {review.comment}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(review.date).toLocaleDateString()}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2">No reviews available</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default SingleProduct;
