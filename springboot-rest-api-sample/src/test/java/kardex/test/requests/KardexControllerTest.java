package kardex.test.requests;

import com.hackerrank.test.utility.Order;
import com.hackerrank.test.utility.OrderedTestRunner;
import com.hackerrank.test.utility.TestWatchman;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestWatcher;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.rules.SpringClassRule;
import org.springframework.test.context.junit4.rules.SpringMethodRule;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import kardex.test.dao.ProductDAO;
import kardex.test.model.Product;

import kardex.test.dao.KDAO;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(OrderedTestRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class KardexControllerTest {
	

	@ClassRule
    public static final SpringClassRule springClassRule = new SpringClassRule();

    @Rule
    public final SpringMethodRule springMethodRule = new SpringMethodRule();

    @Rule
    public TestWatcher watchman = TestWatchman.watchman;

    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ProductDAO productDao;
    
    @Autowired
    private KDAO kDao;
    
    @Autowired
    ObjectMapper objectmapper;
    
    
    String apiRootPath = "http://localhost:8000/products/";
    

    @BeforeClass
    public static void setUpClass() {
        TestWatchman.watchman.registerClass(KardexControllerTest.class);
    }

    @AfterClass
    public static void tearDownClass() {
        TestWatchman.watchman.createReport(KardexControllerTest.class);
    }

   
    @Test
    @Order(1)
    public void Test1() throws Exception {
    	int productSize = 1;
    	int prodSize = productDao.getAllProducts().getProductList().size();
        // System.out.println("p1:"+productSize+",p2:"+prodSize);
        Assert.assertEquals(prodSize, productSize);
    }
    
    @Test
    @Order(2)
    public void Test2() throws Exception {
    	int kardexSize = 2;
    	
    	int kSize= kDao.getAllKs().getKList().size();

        Assert.assertEquals(kSize, kardexSize);
    }
    
    @Test
    @Order(3)
    public void Test3() throws Exception {
    	String value = "150";
        String response = mockMvc.perform(get(apiRootPath+"/kMaxFinalStock?prodCode=XUA-121"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        Assert.assertEquals(response, value);
    }

    
    @Test
    @Order(4)
    public void Test4() throws Exception {
    	Product prod = new Product("XZA-2322","Vaso de Batman");
    	
        
      mockMvc.perform(MockMvcRequestBuilders.post(apiRootPath+"/productAdd")
                .content(asJsonString(prod))
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
        //System.out.println("CODIGO ="+code);
    }
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
