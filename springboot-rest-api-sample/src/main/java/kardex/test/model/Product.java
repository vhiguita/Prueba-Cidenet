package kardex.test.model;

public class Product {
	public Product(){
		
	}
	public Product(String productCode, String product) {
        super();
        this.productCode = productCode;
        this.product = product;
    }
 
    private String productCode;
    private String product;


    public String getProductCode() {
        return productCode;
    }
    
    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }
    
    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }
    

    @Override
    public String toString() {
        return "Product [productCode=" + productCode + ", product=" + product + "]";
    }
}
