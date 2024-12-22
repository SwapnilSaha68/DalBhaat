import React, { useState } from 'react';
import ProductForm from '../ProductForm';
import EditDeleteProduct from '../EditDeleteProduct';
import UserManagement from '../UserManagement';
import OrderManagement from '../OrderManagement';
import WishlistDetails from '../WishlistDetails';
import CouponManagement from '../CouponManagement';
import './AdminPanel.css';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('productForm'); // Main tabs
  const [activeProductOption, setActiveProductOption] = useState('addProduct'); // Sub-options for Product Form

  const renderProductContent = () => {
    switch (activeProductOption) {
      case 'addProduct':
        return <ProductForm />;
      case 'editDeleteProduct':
        return <EditDeleteProduct />;
      case 'wishlistProduct':
        return <WishlistDetails />;
      default:
        return <ProductForm />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'productForm':
        return (
          <div>
            <div className="product-form-tabs">
              <button
                className={`product-tab-btn ${activeProductOption === 'addProduct' ? 'active' : ''}`}
                onClick={() => setActiveProductOption('addProduct')}
              >
                Add Product
              </button>
              <button
                className={`product-tab-btn ${activeProductOption === 'editDeleteProduct' ? 'active' : ''}`}
                onClick={() => setActiveProductOption('editDeleteProduct')}
              >
                Edit/Delete Product
              </button>
              <button
                className={`product-tab-btn ${activeProductOption === 'wishlistProduct' ? 'active' : ''}`}
                onClick={() => setActiveProductOption('wishlistProduct')}
              >
                Wishlist Product
              </button>
            </div>
            <div className="product-form-content">{renderProductContent()}</div>
          </div>
        );
      case 'userManagement':
        return <UserManagement />;
      case 'orderManagement':
        return <OrderManagement />;
      case 'couponManagement':
        return <CouponManagement />;
      default:
        return <ProductForm />;
    }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Admin Panel</h2>
      <div className="admin-panel-tabs">
        <button
          className={`admin-tab-btn ${activeTab === 'productForm' ? 'active' : ''}`}
          onClick={() => setActiveTab('productForm')}
        >
          Product Form
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'userManagement' ? 'active' : ''}`}
          onClick={() => setActiveTab('userManagement')}
        >
          User Management
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'orderManagement' ? 'active' : ''}`}
          onClick={() => setActiveTab('orderManagement')}
        >
          Order Management
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'couponManagement' ? 'active' : ''}`}
          onClick={() => setActiveTab('couponManagement')}
        >
          Coupon Management
        </button>
      </div>
      <div className="admin-panel-content">{renderContent()}</div>
    </div>
  );
}

export default AdminPanel;
