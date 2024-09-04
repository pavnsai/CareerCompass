package com.ooad.careercompass.utils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class CareerCompassUtils {
    private static CareerCompassUtils careerCompassUtils;
    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";
    public final String TWILIO_ACCOUNT_SID = "AC149c076bc2b866a0c48789efbe10e394";
    public final String TWILIO_AUTH_TOKEN = "e31135e1397345256efbbde63b72dcc3";
    public final String TWILIO_AUTH_SERVICE_SID="VAc536ba7dbf710ba52de7ba66040f363c";
    public final String MAILJET_API_KEY="a8b54f9616bd1be21371c2537c485ac4";
    public final String MAILJET_SECRET_KEY="e1a2bd46098874dbac669e12f9c97d4c";
    private static BCryptPasswordEncoder bCryptPasswordEncoder;
    private static final Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
            .create();

    private CareerCompassUtils(){
        bCryptPasswordEncoder=new BCryptPasswordEncoder();
    }
    //        Done: Singleton Pattern
    public static synchronized CareerCompassUtils getInstance(){
        if(careerCompassUtils==null) careerCompassUtils = new CareerCompassUtils();
        return careerCompassUtils;
    }

    public String encodeString(String unEncodedString){
        return bCryptPasswordEncoder.encode(unEncodedString);
    }

    public static <T> T gsonMapper(Object sourceObject, Class<T> targetClass) {
        String json = gson.toJson(sourceObject);
        Type targetType = TypeToken.getParameterized(targetClass, sourceObject.getClass()).getType();
        return gson.fromJson(json, targetType);
    }

    public static <T> Set<T> gsonMapperSet(Set<?> sourceSet, Class<T> targetClass) {
        Type setType = TypeToken.getParameterized(Set.class, targetClass).getType();
        String json = gson.toJson(sourceSet);
        return gson.fromJson(json, setType);
    }

    public static <T, U> List<U> gsonMapperList(List<T> sourceList, Class<U> targetClass) {
        return sourceList.stream()
                .map(sourceObject -> gsonMapper(sourceObject, targetClass))
                .collect(Collectors.toList());
    }
    public String generateUniqueHash() {
                long timestamp = System.currentTimeMillis();
                UUID uuid = UUID.randomUUID();
                return timestamp + uuid.toString();
        }
}
