import { client } from "../../prima/client"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

class RefreshTokenUserUseCase {
    async execute(refresh_token: string) {
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token
            }
        })

        if (!refreshToken) {
            throw new Error('Refresh toke invalid')
        }

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.userId);

        return { token };
    }
}

export { RefreshTokenUserUseCase }