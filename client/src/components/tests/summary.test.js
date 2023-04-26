import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import Summary from "../checkout/Summary";

jest.mock("axios");

describe("Summary component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Getting products from cart and displaying them
  it("should fetch products from cart and display them", async () => {
    const mockData = [
      {
        product_name: "Product 1",
        price: 10,
        quantity: 1,
        image: "https://example.com/product1.jpg",
      },
      {
        product_name: "Product 2",
        price: 20,
        quantity: 2,
        image: "https://example.com/product2.jpg",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    render(
      <Router>
        <Summary />
      </Router>
    );

    // Wait for products to load
    await screen.findByText("Product 1");

    // Check if products are displayed correctly
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("£ 10")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("£ 20")).toBeInTheDocument();

    //Check if clear cart button clears cart
    //Click the clear cart button
    const clearCartButton = screen.getByRole("button", { name: /Clear cart/i });
    clearCartButton.click();

    // Wait for products to be removed
    await screen.findByText(/Your cart is currently empty/i);

    // Check if the cart is empty
    expect(screen.queryByText("Product 1")).toBeNull();
    expect(screen.queryByText("£ 10")).toBeNull();
    expect(screen.queryByText("Product 2")).toBeNull();
    expect(screen.queryByText("£ 20")).toBeNull();

    // Click the return button
    const returnButton = screen.getByRole("button", { name: /Return/i });
    returnButton.click();

    // Check if the user is redirected to the homepage
    expect(window.location.pathname).toBe("/");
  });

  // Update products from cart
  it("should update the quantity of a product in the cart", async () => {
    const mockData = [
      {
        product_name: "Product 1",
        price: 10,
        quantity: 1,
        image: "https://example.com/product1.jpg",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    render(
      <Router>
        <Summary />
      </Router>
    );

    // Wait for product to load
    await screen.findByText("Product 1");

    // Click the dropdown and select a new quantity
    const quantityDropdown = screen.getByRole("combobox");
    fireEvent.change(quantityDropdown, { target: { value: "2" } });

    // Wait for quantity to update
    await screen.findByText("2");

    // Check if quantity is displayed correctly
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("£ 20")).toBeInTheDocument();

    // Click the dropdown and select a new quantity
    fireEvent.change(quantityDropdown, { target: { value: "1" } });

    // Wait for quantity to update
    await screen.findByText("1");

    // Check if quantity is displayed correctly
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("£ 10")).toBeInTheDocument();
  });

  // Delete products from cart
  it("should delete a product from the cart", async () => {
    const mockData = [    {      product_name: "Product 1",      price: 10,      quantity: 1,      image: "https://example.com/product1.jpg",    },    {      product_name: "Product 2",      price: 20,      quantity: 2,      image: "https://example.com/product2.jpg",    },  ];
  
    axios.get.mockResolvedValueOnce({ data: mockData });
  
    render(
      <Router>
        <Summary />
      </Router>
    );
  
    // Wait for products to load
    await screen.findByText("Product 1");
  
    // Check if products are displayed correctly
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("£ 10")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("£ 40")).toBeInTheDocument();
  
    // Find the bin SVG for the first product and click it
    const binIcon = screen.getAllByRole("img", { name: "Delete" })[0];
    binIcon.click();
  
    // Wait for product to be removed
    await screen.findByText("Product 2");
  
    // Check if the correct product was removed
    expect(screen.queryByText("Product 1")).toBeNull();
    expect(screen.queryByText("£ 10")).toBeNull();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("£ 40")).toBeInTheDocument();
  });
});
