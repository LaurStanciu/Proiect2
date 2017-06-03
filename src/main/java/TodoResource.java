//import com.google.gson.Gson;
//import spark.Request;
//import spark.Response;
//import spark.Route;
//
//import java.util.HashMap;
//
//import static spark.Spark.get;
//import static spark.Spark.post;
//import static spark.Spark.put;
///**
// * Created by HP Pavilion i5-3230M on 22/04/2017.
// */
//public class TodoResource {
//    private static final String API_CONTEXT = "/api/v1";
//
//    private final TodoService todoService;
//
//    public TodoResource(TodoService todoService){
//        this.todoService = todoService;
//        setupEndpoints();
//    }
//
//    private void setupEndpoints(){
//        post(API_CONTEXT + "/todos", "application/json",(request, response) -> {
//            todoService.createNewTodo(request.body());
//            response.status(201);
//            return response;
//        });
//
//        get(API_CONTEXT + "/todos/:id", "application/json",(request, response) ->
//            todoService.find(request.params(":id")), new JsonTransformer());
//
//        get(API_CONTEXT + "/todos", "application/json",(request, response) ->
//                todoService.findAll(), new JsonTransformer());
//
//        get(API_CONTEXT + "/todos/:id", "application/json",(request, response) ->
//                todoService.update(request.params(":id"), request.body()), new JsonTransformer());
//
//        get(API_CONTEXT + "/login", "application/json",(request, response) ->
//                todoService.update(request.params(":id"), request.body()), new JsonTransformer());
//
//    }
//}
