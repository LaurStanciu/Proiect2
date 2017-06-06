import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.HashMap;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
/**
 * Created by Laur Stanciu on 6/5/2017.
 */
public class GoodsResource {
    private static final String API_CONTEXT = "/api";

    private final GoodsService goodsService;

    public GoodsResource(GoodsService goodsService){
        this.goodsService = goodsService;
        setupEndpoints();
    }

    private void setupEndpoints() {


        get(API_CONTEXT + "/query/:type/:description", "application/json", (request, response) ->
                goodsService.findGoods(request.params("type"),request.params("description")));

        get(API_CONTEXT + "/query//:description", "application/json", (request, response) ->
                goodsService.findGoods("",request.params("description")));

        get(API_CONTEXT + "/query/:type/", "application/json", (request, response) ->
                goodsService.findGoods(request.params("type"),""));

        get(API_CONTEXT + "/query//", "application/json", (request, response) ->
                goodsService.findGoods("",""));

    }
}
