FROM eclipse-temurin:21-jdk-jammy as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw clean package -DskipTests && \
    ls -la /workspace/app/target/

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

COPY --from=build /workspace/app/target/app.jar app.jar

RUN ls -la /app/

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
