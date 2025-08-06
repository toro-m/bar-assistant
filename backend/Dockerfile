FROM eclipse-temurin:21-jdk-jammy as build
WORKDIR /workspace/app

# Copy build files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application and list the target directory
RUN ./mvnw clean package -DskipTests && \
    ls -la /workspace/app/target/

# Create the runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /workspace/app/target/app.jar app.jar

# List the contents of /app to verify the JAR was copied
RUN ls -la /app/

# Expose the port the app runs on
EXPOSE 8080

# Set the startup command
ENTRYPOINT ["java", "-jar", "app.jar"]
