/**
 * Get all database collection names.
 */

import mongoose from 'mongoose';

export const GetCollections = Object.create(Object.prototype);

GetCollections.getCollections = () => Object.keys(mongoose.connection.collections);