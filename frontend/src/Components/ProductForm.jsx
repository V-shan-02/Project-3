export default function ProductForm() {
  return (
    <div className="product-form">
      <h2>Product Form</h2>
      <form>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Product Name"
        />
        <br />

        <input type="text" id="brand" name="brand" placeholder="Brand" />
        <br />

        <input type="text" id="image" name="image" placeholder="Image Link" />
        <br />

        <input type="text" id="price" name="price" placeholder="Price" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
