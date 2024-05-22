# Basis-Image festlegen, auf dem Ihr Docker-Image basiert
FROM --platform=linux/amd64 openjdk:21

# Port der Container nach außen freigibt
EXPOSE 8080

# Datei app.jar in Container laden und in „app.jar“ umbennen
ADD backend/target/app.jar app.jar

#  Was soll beim Start des Containers ausgeführt werden
ENTRYPOINT ["java", "-jar", "app.jar"]

#Alternative zu Entrypoint
# CMD ["sh", "-c", "java -jar /currywurst.jar"
