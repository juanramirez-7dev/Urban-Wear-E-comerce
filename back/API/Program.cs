using API.Context;
using API.Interfaces.Repositories;
using API.Interfaces.Services;
using API.Repositories;
using API.Seeders;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection")));

// Autenticación y Autorización
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters.ValidateIssuer = true;
        options.TokenValidationParameters.ValidateAudience = true;
        options.TokenValidationParameters.ValidateLifetime = true;
        options.TokenValidationParameters.ValidateIssuerSigningKey = true;

        options.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:Issuer"];
        options.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:Audience"];
        options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]!));
    });

builder.Services.AddAuthorization();

// CORS
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Front", policy =>
    {
        policy.WithOrigins(allowedOrigins!)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Servicios
builder.Services.AddScoped<ICategoriaService, CategoriaService>();
builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IHasherService, HasherService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IPedidoService, PedidoService>();
builder.Services.AddScoped<ICarritoService, CarritoService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IVarianteService, VarianteService>();

// Repositorios
builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();
builder.Services.AddScoped<IProductoRepository, ProductoRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IProductoVarianteRepository, ProductoVarianteRepository>();
builder.Services.AddScoped<IImagenRepository, ImagenRepository>();
builder.Services.AddScoped<IPedidoRepository, PedidoRepository>();
builder.Services.AddScoped<IPedidoItemRepository, PedidoItemRepository>();
builder.Services.AddScoped<ICarritoRepository, CarritoRepository>();
builder.Services.AddScoped<ICarritoItemRepository, CarritoItemRepository>();
builder.Services.AddScoped<ICodigoRecuperacionRepository, CodigoRecuperacionRepository>();

// Controllers
builder.Services.AddControllers()
        .AddJsonOptions( options =>
        {
            options.JsonSerializerOptions.Converters
           .Add(new JsonStringEnumConverter());  // convierte enums a string en JSON
        });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Seed de datos y migraciones
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    var fileService = scope.ServiceProvider
        .GetRequiredService<IFileService>();

    var hasherService = scope.ServiceProvider
        .GetRequiredService<IHasherService>();


    await context.Database.MigrateAsync(); // Crea la BD + aplica migraciones
    await DataSeeder.SeedAsync(context, fileService, hasherService);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => Results.Redirect("/swagger"));

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("Front");

app.UseAuthentication();

app.UseAuthorization();
    
app.MapControllers();

app.Run();
