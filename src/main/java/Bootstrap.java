import com.mongodb.client.MongoDatabase;
import spark.Request;
import spark.Response;
import spark.Route;

import static spark.Spark.*;

/**
 * Created by HP Pavilion i5-3230M on 22/04/2017.
 */
import com.mongodb.*;

import static spark.Spark.setIpAddress;
import static spark.Spark.setPort;
import static spark.SparkBase.staticFileLocation;

public class Bootstrap {
    private static final String IP_ADDRESS = System.getenv("OPENSHIFT_DIY_IP") != null ? System.getenv("OPENSHIFT_DIY_IP") : "localhost";
    private static final int PORT = System.getenv("OPENSHIFT_DIY_PORT") != null ? Integer.parseInt(System.getenv("OPENSHIFT_DIY_PORT")) : 8080;

    public static void main(String[] args) throws Exception {
        setIpAddress(IP_ADDRESS);
        setPort(PORT);
        staticFileLocation("/public");
        new GoodsResource(new GoodsService(mongo()));
        new AccountsResource(new AccountsService(mongo()));

    }

    private static MongoDatabase mongo() throws Exception {

        MongoClient mongoClient = new MongoClient("localhost", 27017);
        return mongoClient.getDatabase("onlineShop");
    }

}

