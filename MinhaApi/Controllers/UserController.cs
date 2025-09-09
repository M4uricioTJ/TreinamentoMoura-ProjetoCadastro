using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MinhaApi.Models;

namespace MinhaApi.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly SqlConnection conn;
    private readonly SqlCommand cmd;
    private readonly string connectionString = "Server=TREINAMENTO-06;Database=usuarios;User Id=sa;Password=epilef;TrustServerCertificate=true;";

    public UserController()
    {
        conn = new SqlConnection(connectionString);
        cmd = new SqlCommand();
        cmd.Connection = conn;
    }

    [HttpGet("obter-todos")]
    public async Task<ActionResult<List<User>>> GetAll()
    {
        var userList = new List<User>();
        using (conn)
        {
            await conn.OpenAsync();
            using (cmd)
            {
                cmd.CommandText = "SELECT * FROM Users ORDER BY id;";
                SqlDataReader dr = await cmd.ExecuteReaderAsync();
                while (await dr.ReadAsync())
                {
                    User user = new User();
                    Mapper(user, dr);
                    userList.Add(user);
                }
            }
        }
        return Ok(userList);
    }

    [HttpGet("user/{id:int}")]
    public async Task<ActionResult<User>> GetById(int id)
    {
        var user = new User();
        using (conn)
        {
            await conn.OpenAsync();
            using (cmd)
            {
                cmd.CommandText = "SELECT * FROM Users WHERE id = @id";
                cmd.Parameters.Add(new SqlParameter("@id", System.Data.SqlDbType.Int)).Value = id;

                SqlDataReader dr = await cmd.ExecuteReaderAsync();
                while (await dr.ReadAsync())
                {
                    Mapper(user, dr);
                }
            }
        }
        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<bool>> LoginUser([FromBody] User user)
    {
        bool loginExiste = false;
        using (conn)
        {
            await conn.OpenAsync();
            using (cmd)
            {
                cmd.CommandText = "SELECT * FROM Users WHERE email = @email AND senha = @senha";
                cmd.Parameters.Add(new SqlParameter("@email", System.Data.SqlDbType.VarChar)).Value = user.email;
                cmd.Parameters.Add(new SqlParameter("@senha", System.Data.SqlDbType.VarChar)).Value = user.senha;

                SqlDataReader dr = await cmd.ExecuteReaderAsync();
                if (await dr.ReadAsync())
                {
                    loginExiste = true;
                }
            }
        }
        return Ok(loginExiste);
    }

    [HttpPost("gravar-user")]
    public async Task<ActionResult> Post([FromBody] User user)
    {
        if (!ModelState.IsValid)
            return BadRequest();
        using (conn)
        {
            await conn.OpenAsync();
            using (cmd)
            {
                cmd.CommandText = "INSERT INTO Users VALUES (@nome, @endereco, @email, @datacad, @saldo, @senha); SELECT SCOPE_IDENTITY();";
                cmd.Parameters.Add(new SqlParameter("@nome", System.Data.SqlDbType.VarChar)).Value = user.nome;
                cmd.Parameters.Add(new SqlParameter("@endereco", System.Data.SqlDbType.VarChar)).Value = user.endereco;
                cmd.Parameters.Add(new SqlParameter("@email", System.Data.SqlDbType.VarChar)).Value = user.email;
                cmd.Parameters.Add(new SqlParameter("@datacad", System.Data.SqlDbType.Date)).Value = DateTime.Now;
                cmd.Parameters.Add(new SqlParameter("@saldo", System.Data.SqlDbType.Decimal)).Value = user.saldo;
                cmd.Parameters.Add(new SqlParameter("@senha", System.Data.SqlDbType.VarChar)).Value = user.senha;
                user.id = Convert.ToInt32(await cmd.ExecuteScalarAsync());
            }
        }
        return Ok();
    }

    [HttpPut("editar/{id:int}")]
    public async Task<ActionResult<bool>> Update([FromBody] User user)
    {
        int linhasAfetadas = 0;
        if (!ModelState.IsValid && user.id == 0)
            return BadRequest();
        using (conn)
        {
            await conn.OpenAsync();
            using (cmd)
            {
                cmd.CommandText = "UPDATE Users SET nome = @nome, endereco = @endereco, email = @email, datacad = @datacad, saldo = @saldo, senha = @senha WHERE id = @id;";
                cmd.Parameters.Add(new SqlParameter("@nome", System.Data.SqlDbType.VarChar)).Value = user.nome;
                cmd.Parameters.Add(new SqlParameter("@endereco", System.Data.SqlDbType.VarChar)).Value = user.endereco;
                cmd.Parameters.Add(new SqlParameter("@email", System.Data.SqlDbType.VarChar)).Value = user.email;
                cmd.Parameters.Add(new SqlParameter("@datacad", System.Data.SqlDbType.Date)).Value = user.datacad;
                cmd.Parameters.Add(new SqlParameter("@saldo", System.Data.SqlDbType.Decimal)).Value = user.saldo;
                cmd.Parameters.Add(new SqlParameter("@senha", System.Data.SqlDbType.VarChar)).Value = user.senha;
                cmd.Parameters.Add(new SqlParameter("@id", System.Data.SqlDbType.Int)).Value = user.id;

                linhasAfetadas = await cmd.ExecuteNonQueryAsync();
            }
        }
        if (linhasAfetadas == 0)
            return BadRequest();
        return Ok();
    }

    [HttpDelete("apagar/{id:int}")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        int linhasAfetadas = 0;
        if (id == 0)
            return BadRequest();
        using (conn)
        {
            await conn.OpenAsync();
            using (cmd)
            {
                cmd.CommandText = "DELETE FROM Users WHERE id = @id;";
                cmd.Parameters.Add(new SqlParameter("@id", System.Data.SqlDbType.Int)).Value = id;

                linhasAfetadas = await cmd.ExecuteNonQueryAsync();
            }
        }
        if (linhasAfetadas == 0)
            return BadRequest();
        return Ok();
    }

    private void Mapper(User user, SqlDataReader dr)
    {
        user.nome = dr["nome"].ToString();
        user.email = dr["email"].ToString();
        user.endereco = dr["endereco"].ToString();
        user.saldo = Convert.ToDouble(dr["saldo"]);
        user.datacad = Convert.ToDateTime(dr["datacad"]);
        user.id = (int)dr["id"];
        user.senha = dr["senha"].ToString();
    }
}