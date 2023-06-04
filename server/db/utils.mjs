const Utils = {};
Utils.getCurrentSession = (req) =>
{
    if (req?.sessionStore?.sessions && Object.keys(req.sessionStore.sessions).length > 0)
    {
        const sessions = req.sessionStore.sessions;
        if (sessions && Object.keys(sessions).length > 0)
        {
            for (const key in sessions)
            {
                if (Object.hasOwnProperty.call(sessions, key))
                {
                    const s = JSON.parse(sessions[key]);
                    if (s.currentUser && req.session)
                    {
                        req.session.currentUser = s.currentUser;
                    }
                }
            }
        }
    }
}

export default Utils;