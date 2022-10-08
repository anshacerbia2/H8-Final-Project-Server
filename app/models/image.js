'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product)
    }
  }
  Image.init({
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Image Url is required`
        },
        notNull: {
          msg: `Image Url is required`
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Product Id is required`
        },
        notNull: {
          msg: `Product Id is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};