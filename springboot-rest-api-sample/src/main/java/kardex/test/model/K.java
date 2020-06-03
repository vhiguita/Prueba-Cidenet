package kardex.test.model;

public class K {
	public K(){
		
	}
	public K(Integer id, String productCode, Integer initialStock, String operation, Integer quantity, Integer finalStock) {
        super();
        this.id = id;
        this.productCode = productCode;
        this.initialStock = initialStock;
        this.operation = operation;
        this.quantity = quantity;
        this.finalStock = finalStock;
    }
	private Integer id;
    private String productCode;
    private Integer initialStock;
    private String operation;
    private Integer quantity;
    private Integer finalStock;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }
    
    public Integer getInitialStock() {
        return initialStock;
    }

    public void setInitialStock(Integer initialStock) {
        this.initialStock = initialStock;
    }
    
    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }
    
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public Integer getFinalStock() {
        return finalStock;
    }

    public void setFinalStock(Integer finalStock) {
        this.finalStock = finalStock;
    }
    @Override
    public String toString() {
        return "K [id=" + id + ", productCode=" + productCode + ", initialStock=" + initialStock + ", operation=" + operation + ", quantity=" + quantity + ", finalStock=" + finalStock + "]";
    }
}
