use anchor_lang::prelude::*;

declare_id!("3EZdSHXKEFFu91o6i4d7ERsVuK2aRWEZDzWfSPHP414a");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
