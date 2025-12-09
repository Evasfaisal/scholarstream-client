import React, { useState } from 'react';

const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-6 bg-base-200 rounded w-1/2"></div>
        <div className="h-4 bg-base-200 rounded w-1/3"></div>
        <div className="h-4 bg-base-200 rounded w-2/3"></div>
        <div className="h-4 bg-base-200 rounded w-1/4"></div>
    </div>
);

export default LoadingSkeleton;
