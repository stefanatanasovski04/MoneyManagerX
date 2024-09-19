namespace MMX.Application.Contracts.Responses.Dtos
{
    public class IconDto
    {
        public int Id { get; set; }

        public byte[] Photo { get; set; } = Array.Empty<byte>();
    }
}
