using System.ComponentModel.DataAnnotations;

namespace MinhaApi.Models
{
    public class User
    {
        public int? id { get; set; }
        public string? nome { get; set; }
        public string? endereco { get; set; }
        public string? email { get; set; }
        public DateTime? datacad { get; set; }
        public double? saldo { get; set; }
        public string? senha { get; set; }
    }
}